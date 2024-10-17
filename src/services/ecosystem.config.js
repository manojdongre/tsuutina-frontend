module.exports = {
  apps: [
    {
      name: "nextjs-app",   // Your app name
      script: "npm",
      args: "start",        // For production, Next.js runs with 'npm start'
      exec_mode: "fork",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",  // Environment variables
      },
    },
  ],
};
