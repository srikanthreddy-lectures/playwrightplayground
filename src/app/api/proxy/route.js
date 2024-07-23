export default async (req, res) => {
    const { url } = req.query;
    try {
      const response = await fetch(url);
      const data = await response.text();
      res.status(200).send(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch data" });
    }
  };