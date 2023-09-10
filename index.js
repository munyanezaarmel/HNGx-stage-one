const express = require("express");
const {
  format,
  addMinutes,
  subMinutes,
  isWithinInterval,
} = require("date-fns");

const app = express();
const port = 3000; 

app.get("/api", (req, res) => {
  const { slack_name, track } = req.query;


  const now = new Date();
  const utcTime = format(now, "yyyy-MM-dd'T'HH:mm:ss'Z'");

  const currentDay = format(now, "EEEE");

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
    "https://github.com/munyanezaarmel/HNGx-stage-one/blob/main/index.js"; 
  const githubRepoUrl = "https://github.com/munyanezaarmel/HNGx-stage-one"; 

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
