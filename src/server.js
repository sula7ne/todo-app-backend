import path, { dirname } from "path"

import adminRoutes from "./routes/adminRoutes/adminRoutes.js"
import authMiddleware from "./middleware/authMiddleware.js"
import authRoutes from "./routes/authRoutes.js"
import express from "express"
import { fileURLToPath } from "url"
import todoRoutes from "./routes/todoRoutes.js"

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