import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container } from '@mui/system';
import { Paper, Button, IconButton, Tooltip, Card } from '@mui/material';


export default function Customer() {
    const Paperstyle = { padding: '50px 20px', width: 800, margine: '20px auto' }

    const [custID, setCustID] = useState('')
    const [initCredit, setInitCredit] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [account, setAccount] = useState('')
    const [balance, setBalance] = useState('')
    const [customers, setCustomers] = useState([])
    const [txns, setTxns] = useState([])
    

    const openaccount = (e) => {
        e.preventDefault()
        const customer = [custID, initCredit]
        //console.log(customer)

        fetch(`http://localhost:80/openaccount/${custID}/${initCredit}`, {
            method: "GET",
            mode: 'no-cors',
            headers: { "Content-Type": "application/json" },
        }).then(() => { console.log("New Account created!") })
    }

    const getcustomerinfo = (e) => {
        //e.preventDefault()
        const customer = [custID, firstname, lastname, account, balance]
        //console.log(customer)

        const res = fetch(`http://localhost:80/userinformation/${custID}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            //body: JSON.stringify(customer),
        }).then((res) => {
            return res.json();
        })
        .then((data) => {
            //console.log(data);
            setCustomers(data)
            //console.log(customers);

        });
        console.log(customers);
    }

    const getcustomertxns = (e) => {
        e.preventDefault()
        //const customer = [custID, firstname, lastname, account, balance]
        console.log(`http://localhost/accounttxn/${custID}/${account}`)

        const res = fetch(`http://localhost/accounttxn/${custID}/${account}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            //body: JSON.stringify(customer),
        }).then((res) => {
            return res.json();
        })
        .then((data) => {
            //console.log(data);
            setTxns(data)
            console.log(txns);

        });
        console.log("In Paper Click!");
    }
    useEffect(() => {
        //setCustID('2222222222');
        getcustomerinfo();
      }, []);

    return (
        <Container>
            <Paper elevation={3} style={Paperstyle}>
                <h1 style={{ color: 'blue' }}><u>Open Account</u></h1>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField id="standard-basic" label="Customer ID" variant="standard" fullWidth
                        value={custID}
                        onChange={(e) => setCustID(e.target.value)} />
                    <TextField id="standard-basic" label="Initial credit" variant="standard" fullWidth
                        value={initCredit}
                        onChange={(e) => setInitCredit(e.target.value)} />
                    <Button variant="contained" color="success" onClick={openaccount}>
                        Submit
                    </Button >
                </Box>
            </Paper>
            <Paper elevation={3} style={Paperstyle}>
                <h1 style={{ color: 'blue' }}><u>Get Cusomer data</u></h1>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField id="standard-basic" label="Customer ID" variant="standard" fullWidth
                        value={custID}
                        onChange={(e) => setCustID(e.target.value)} />
                    <Button variant="contained" color="success" onClick={getcustomerinfo}>
                        Submit
                    </Button >
                </Box>
            </Paper>
            <Paper elevation={3} style={Paperstyle}>
                <h1 style={{ color: 'blue' }}><u>Customer Data</u></h1>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    { Array.from(customers).map(customer => (
                        <Tooltip title="Click to get account transactions!" >
                        
                        <Card  id = {customer.account} elevation={6} style={{ margin: "10px", padding: "15px", textAlign: "left" }}
                        href="true" onClick={getcustomertxns} onMouseUp={() => setAccount(customer.customerAccount)}>
                            Customer ID : {customer.customerID}<br/>
                            First name : {customer.customerFirstName}<br/>
                            Last name : {customer.customerLastName}<br/>
                            account : {customer.customerAccount}<br/>
                            Balance : {customer.balance}<br/>
                        </Card>
                        </Tooltip>
                    ))
                    }
                </Box>
            </Paper>
            <Paper elevation={3} style={Paperstyle}>
                <h1 style={{ color: 'blue' }}><u>Customer Transactions</u></h1>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    { Array.from(txns).map(txn => (
                        <Paper  elevation={6} style={{ margin: "10px", padding: "15px", textAlign: "left" }}  >
                            Customer ID : {txn.customer_ID}<br/>
                            Account : {txn.account}<br/>
                            Transaction Amount : {txn.txn_amount}<br/>
                            Transaction Type : {txn.txn}<br/>
                            Transaction Date : {txn.date_time}<br/>
                            Balance After Transaction : {txn.balance_after_txn}<br/>
                        </Paper>
                        
                    ))
                    }
                </Box>
            </Paper>
        </Container>
    );
}
