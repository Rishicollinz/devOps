module.exports = {
  apps: [{
    name: "vite-app",
    script: "npm",
    args: "run dev", // Assuming your start script for Vite is 'npm run dev'
    cwd: "/home/rishikeshb/Documents/DevOps/pm2/ex1", // Change this to the actual path of your Vite app
    watch: true,
    ignore_watch: ["node_modules"],
    instances: "4",
    exec_mode: "cluster"
  }]
};
