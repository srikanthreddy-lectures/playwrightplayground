function stripAnsi(str) {
    const ansiRegex = /\x1b\[[0-9;]*m/g;
    return str.replace(ansiRegex, '');
  }
  
  let message = `Error: \u001b[31mTimed out 5000ms waiting for \u001b[39m\u001b[2mexpect(\u001b[22m\u001b[31mlocator\u001b[39m\u001b[2m).\u001b[22mtoHaveTitle\u001b[2m(\u001b[22m\u001b[32mexpected\u001b[39m\u001b[2m)\u001b[22m\n\nLocator: locator(':root')\nExpected string: \u001b[32m"Jane\u001b[7m1\u001b[27m Doe"\u001b[39m\nReceived string: \u001b[31m"Jane Doe"\u001b[39m\nCall log:\n\u001b[2m- expect.toHaveTitle with timeout 5000ms\u001b[22m\n\u001b[2m- waiting for locator(':root')\u001b[22m\n\u001b[2m- locator resolved to <html lang=\"en\" class=\"fontawesome-i2svg-active fontawesome-i2svg-complete\"></html>\u001b[22m\n\u001b[2m- unexpected value \"Jane Doe\"\u001b[22m\n [...] \u001b[2m- unexpected value \"Jane Doe\"\u001b[22m\n`;
  
  const strippedMessage = stripAnsi(message);
  
  // Adjusted Regex pattern to correctly extract details
  const pattern = /Error: ([\s\S]+?)\n\nLocator: ([\s\S]+?)\nExpected string: "([\s\S]+?)"\nReceived string: "([\s\S]+?)"/;
  
  const matches = strippedMessage.match(pattern);
  let rest = {};
  if (matches) {
    rest = {
      errorDescription: matches[1].trim(),
      locator: matches[2].trim(),
      expectedString: matches[3],
      receivedString: matches[4]
    };
  }
  
  console.log(rest);