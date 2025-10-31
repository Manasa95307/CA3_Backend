const express = require('express')
const PORT = 3000

const app =express()

app.use(express.json())

const recipes = []

app.post('/api/recipes', (req, res)=>{
    const r = req.body
    if (!r.title || !r.ingredients || !r.instructions || !r.cookingTime){
        return res.status(400).json({error:"Missing required fields"})
    }
    r.id = Date.now().toString()
    recipes.push(r)
    res.status(201).json(recipes)
})

app.get('/api/recipes', (req, res)=>{
    res.json(recipes)
})

app.put('/api/recipes/:id',(req, res)=>{
    const id = req.params.id
    const index = recipes.findIndex(r=>r.id == id)

    if (index == -1){
        return res.status(404).json({error:"Recipe not found"})
    }
    recipes[index] = {...recipes[index], ...req.body}
    res.json(recipes[index])
})
app.delete('/api/recipes/:id',(req, res)=>{
    const id = req.params.id
    const index = recipes.findIndex(r=>r.id == id)

    if (index == -1){
        return res.status(404).json({error:"Recipe not found"})
    }
    recipes.splice(index, 1)
    res.json({message:"Deleted Successfully"})
})

app.listen(PORT, ()=>{
    console.log(`Server running at http://localhost:${PORT}`)
})