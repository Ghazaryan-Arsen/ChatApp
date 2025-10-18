# 3D Market Platform Deployment Guide

This guide provides step-by-step instructions for deploying both the frontend prototype and the Node.js backend to Vercel.

## Prerequisites

1.  **Vercel Account:** You will need a Vercel account. You can sign up for free at [vercel.com](https://vercel.com).
2.  **MongoDB Database:** You need a MongoDB database. You can get a free one from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
3.  **Git Repository:** Your project should be in a Git repository (e.g., on GitHub, GitLab, or Bitbucket) connected to your Vercel account.

---

## Step 1: Deploying the Backend

The backend is a Node.js Express server located in the `/backend` directory.

1.  **Create a New Vercel Project:**
    *   Go to your Vercel dashboard and click "Add New... > Project".
    *   Import the Git repository containing this project.

2.  **Configure the Backend Project:**
    *   **Framework Preset:** Vercel should automatically detect it as a "Vercel for Node.js" project. If not, select that preset.
    *   **Root Directory:** In the "Build & Development Settings", set the **Root Directory** to `backend`. This tells Vercel to look inside the `/backend` folder for the source code.
    *   **Environment Variables:** You need to add your secret keys. Go to the "Environment Variables" section and add the following:
        *   `MONGO_URI`: Your MongoDB connection string.
        *   `JWT_SECRET`: A long, random string to sign your JWTs (e.g., you can generate one online).

3.  **Deploy:**
    *   Click the "Deploy" button. Vercel will build and deploy your backend API.
    *   Once the deployment is complete, Vercel will provide you with a public URL for your API (e.g., `https://your-backend-project.vercel.app`). **Copy this URL.**

---

## Step 2: Deploying the Frontend

The frontend is a static website located in the root directory.

1.  **Create Another Vercel Project:**
    *   Go back to your Vercel dashboard and create another new project, importing the **same** Git repository.

2.  **Configure the Frontend Project:**
    *   **Framework Preset:** Vercel should detect this as "Other".
    *   **Root Directory:** Leave the **Root Directory** as the default (the root of your repository).
    *   **Build & Development Settings:** No changes are needed here. Vercel will automatically serve the `index.html` file.

3.  **Connect Frontend to Backend:**
    *   Before deploying, you need to tell the frontend where to find the backend API.
    *   Open the `js/main.js` file.
    *   On the first line, change the `API_URL` constant to the URL of your deployed backend:
        ```javascript
        const API_URL = 'https://your-backend-project.vercel.app/api'; // <-- PASTE YOUR BACKEND URL HERE
        ```
    *   Commit and push this change to your Git repository.

4.  **Deploy:**
    *   Go back to your Vercel project settings for the frontend and trigger a new deployment (or it may happen automatically when you push the change).
    *   Once deployed, Vercel will give you a public URL for your frontend prototype. This is the live link to your application.

---

## You're Done!

Your 3D Market Platform prototype should now be live. You can visit the frontend URL, register a new user, and test the functionality.