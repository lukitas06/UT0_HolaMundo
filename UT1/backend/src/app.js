




// ===== DDBB =====//


connection.connect((err)=>{
    if(err) throw err
    console.log("DDBB conectada");
});

app.listen(3000, () => {
    console.log("servidor encendido");
})

