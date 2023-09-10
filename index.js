const express = require("express");
const {
  format,
  addMinutes,
  subMinutes,
  isWithinInterval,
} = require("date-fns");

const app = express();
const port = 3000; // You can change this to any port you prefer

app.get("/api", (req, res) => {
  const { slack_name, track } = req.query;

  // Get the current UTC time
  const now = new Date();
  const utcTime = format(now, "yyyy-MM-dd'T'HH:mm:ss'Z'");

  // Get the current day of the week
  const currentDay = format(now, "EEEE");

  // Validate UTC time within a +/-2 minute window
  const twoMinutesAgo = subMinutes(now, 2);
  const twoMinutesFromNow = addMinutes(now, 2);
  const isValidTime = isWithinInterval(now, {
    start: twoMinutesAgo,
    end: twoMinutesFromNow,
  });

  if (!slack_name || !track || !isValidTime) {
    return res.status(400).json({ error: "Invalid request parameters" });
  }

  const githubFileUrl =
    "https://github.com/munyanezaarmel/HNGx-stage-one/blob/main/index.js"; // Replace with your actual file URL
  const githubRepoUrl = "https://github.com/munyanezaarmel/HNGx-stage-one"; // Replace with your actual repo URL

  const response = {
    slack_name,
    current_day: currentDay,
    utc_time: utcTime,
    track,
    github_file_url: githubFileUrl,
    github_repo_url: githubRepoUrl,
    status_code: 200,
  };

  res.json(response);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
