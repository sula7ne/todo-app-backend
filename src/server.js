import path, { dirname } from "path"

import adminRoutes from "./routes/adminRoutes/admin.routes.js"
import authMiddleware from "./middleware/authMiddleware.js"
import authRoutes from "./routes/auth.routes.js"
import express from "express"
import { fileURLToPath } from "url"
import todoRoutes from "./routes/todo.routes.js"

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// Routes
app.use('/auth', authRoutes);
app.use('/todos', authMiddleware, todoRoutes);
app.use('/admin', adminRoutes);


app.listen(PORT, () => console.log(`Server has started on port: ${PORT}`));