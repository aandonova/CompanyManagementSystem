const PROXY_CONFIG = {
  "/api": {
      "target": "https://staging.officernd.com/api/v1/organizations/assignment-demo/",
      "secure": true,
      "bypass": function (req, res, proxyOptions) {
          req.headers["Authorization"] = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkODM5MzJiZTU5YmU1MjcwNGMzMGZhOSIsImlhdCI6MTYwNTg3NTc5OCwiZXhwIjoxNjM3NDExNzk4fQ.U83_KnUAkPoI65NPwGyET_4HNiF4Lvd7pl6RLHhWSFM";
      },
      "pathRewrite": {
          "^/api": ""
      },
      "changeOrigin": true
  }
}

module.exports = PROXY_CONFIG;


