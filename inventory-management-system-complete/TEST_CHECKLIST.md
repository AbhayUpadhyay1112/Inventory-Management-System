# Manual Test Checklist

- [ ] GET /health -> 200
- [ ] POST /products valid -> 201
- [ ] GET /products -> created product visible
- [ ] POST /products duplicate name -> 409
- [ ] POST /products price 0 -> 400
- [ ] POST /products negative stock -> 400
- [ ] POST /products/purchase valid -> stock decreases
- [ ] POST /products/purchase quantity 0 -> 400
- [ ] POST /products/purchase quantity > stock -> 400
- [ ] POST /products/restock valid -> stock increases
- [ ] POST /products/restock quantity 0 -> 400
- [ ] GET /products/:productId/history -> Purchase/Restock transactions visible
- [ ] Invalid product ID -> 400
- [ ] Non-existent product -> 404
