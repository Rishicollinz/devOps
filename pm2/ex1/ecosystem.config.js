module.exports = {
  apps: [{
    name: "vite-app",
    script: "npm",
    args: "run dev", // Assuming your start script for Vite is 'npm run dev'
    cwd: "/home/rishikeshb/Documents/DevOps/pm2/ex1", // Change this to the actual path of your Vite app
    watch: false,
    ignore_watch: ["node_modules"],
    instances: "8",
    exec_mode: "cluster",
    autorestart: true,
    max_memory_restart: '100M',
    restart_delay: 5000, // Optional: Delay between restarts (in milliseconds)
    // Specify restart strategy
    restart: 'always' // or 'never' or 'on-failure'
  }]
};
