const express = require('express');
const app = express();
const port = 3005;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/token', (req, res) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch("https://athack-back-hiu-2023.vercel.app/token", requestOptions)
    .then(response => response.text())
    .then(result => res.send(result))
    .catch(error => console.log('error', error));
});

app.get('/payment/:id/:montant', (req, res) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const id = req.params.id;
    const montant = req.params.montant;
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
  
    fetch("https://athack-back-hiu-2023.vercel.app/token", requestOptions)
      .then(response => response.text())
      .then(token => {
        var json = JSON.parse(token);
        
  
        var myHeaders2 = new Headers();
        myHeaders2.append("X-Country", "MG");
        myHeaders2.append("X-Currency", "MGA");
        myHeaders2.append("Authorization", `Bearer ${json.access_token}`);
        myHeaders2.append("Content-Type", "application/json");
    
        var raw = JSON.stringify({
        "reference": "Testing transaction",
        "subscriber": {
            "country": "MG",
            "currency": "MGA",
            "msisdn": 331954047
        },
        "transaction": {
            "amount": montant,
            "country": "MG",
            "currency": "MGA",
            "id": id
        }
        });
    
        var requestOptions = {
        method: 'POST',
        headers: myHeaders2,
        body: raw,
        redirect: 'follow'
        };
    
        fetch("https://openapiuat.airtel.africa/merchant/v1/payments/", requestOptions)
        .then(response => response.text())
        .then(result => res.send(result))
        .catch(error => console.log('error', error));
      })
      .catch(error => console.log('error', error));
    
  });

app.get('/balance', (req, res) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
  
    fetch("https://athack-back-hiu-2023.vercel.app/token", requestOptions)
      .then(response => response.text())
      .then(token => {
        var json = JSON.parse(token);
        var balanceHeaders = new Headers();
        balanceHeaders.append("X-Country", "MG");
        balanceHeaders.append("X-Currency", "MGA");
        balanceHeaders.append("Authorization", `Bearer ${json.access_token}`);
        
        var balanceRequestOptions = {
          method: 'GET',
          headers: balanceHeaders,
          redirect: 'follow'
        };
  
        fetch("https://openapiuat.airtel.africa/standard/v1/users/balance", balanceRequestOptions)
          .then(response => response.text())
          .then(result => res.send(result))
          .catch(error => console.log('error', error));
      })
      .catch(error => console.log('error', error));
  });

app.get('/transaction/:id', (req,res) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const id = req.params.id;
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
  
    fetch("https://athack-back-hiu-2023.vercel.app/token", requestOptions)
      .then(response => response.text())
      .then(token => {
        var json = JSON.parse(token);
        
        var myHeaders2 = new Headers();
        myHeaders2.append("X-Country", "MG");
        myHeaders2.append("X-Currency", "MGA");
        myHeaders2.append("Authorization", `Bearer ${json.access_token}`);

        var requestOptions = {
        method: 'GET',
        headers: myHeaders2,
        redirect: 'follow'
        };

        fetch("https://openapiuat.airtel.africa/standard/v1/payments/"+id, requestOptions)
        .then(response => response.text())
        .catch(error => console.log('error', error));

      })
      .catch(error => console.log('error', error));
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
