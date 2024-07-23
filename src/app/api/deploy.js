// pages/api/deploy.js
import Docker from 'dockerode';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);
const docker = new Docker();

function extractRepoNameFromUrl(url) {
    try {
      const parsedUrl = new URL(url);
      const path = parsedUrl.pathname.split('/').filter(Boolean);
      // Assuming the URL is like https://github.com/user/repo or https://github.com/user/repo.git
      if (path.length >= 2) {
        return path.slice(0, 2).join('_').replace(/.git$/, "");
      }
      return null;
    } catch (error) {
      // The URL constructor throws error for invalid URL
      console.error("Invalid URL provided");
      return null;
    }
  }

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { githubUrl } = req.body;

      // Step A: Clone the repository
      const repoName = extractRepoNameFromUrl(githubUrl); // Extract repository name from the URL
      await execAsync(`git clone ${githubUrl} ${repoName}`);

      // Step B: Check for a Dockerfile and add it if missing
      try {
        await execAsync(`test -e ${repoName}/Dockerfile`);
      } catch {
        await execAsync(`echo "FROM node" >> ${repoName}/Dockerfile`);
        await execAsync(`echo "WORKDIR /app" >> ${repoName}/Dockerfile`);
        await execAsync(`echo "COPY . /app" >> ${repoName}/Dockerfile`);
        await execAsync(`echo "FROM node" >> ${repoName}/Dockerfile`);

      }

      // Step C: Build Docker image
      await docker.buildImage({
        context: `./${repoName}`,
        src: ['Dockerfile'],
      }, { t: `${repoName}:latest` });

      // Step D: Run a container from the image
      const container = await docker.createContainer({
        Image: `${repoName}:latest`,
        AttachStdin: false,
        AttachStdout: true,
        AttachStderr: true,
        Tty: true,
      });
      await container.start();
      
      res.status(200).json({ success: true, message: 'Container started' });

    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}