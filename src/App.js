import React from 'react';
import Header from './components/HeaderComponent';
import Footer from './components/FooterComponent';
import './App.css';
import TransactionPage from './Pages/TransactionPage';

function App() {

    const [dataTransaction, setDataTransaction] = React.useState([]);

    console.log(dataTransaction);

    const handleAddTransaction = (data) => {
        setDataTransaction((ps) => ([...ps, data]));
    };

    const handleDeleteTransaction = (data) => {
        setDataTransaction(data);
    };

    React.useEffect(() => {
        if (localStorage.getItem('moneyTrack_dataTransaction') && localStorage.getItem('moneyTrack_dataTransaction') !== '[]'){
            setDataTransaction(JSON.parse(localStorage.getItem('moneyTrack_dataTransaction')));
        }
    }, []);

    React.useEffect(() => {
        localStorage.setItem('moneyTrack_dataTransaction',JSON.stringify(dataTransaction))
    }, [dataTransaction]);

    return (
        <React.Fragment>
            <Header/>
            <TransactionPage data={dataTransaction} onAddNewTransaction={handleAddTransaction} onDeleteDataTransaction={handleDeleteTransaction}/>
            <Footer/>
        </React.Fragment>
    );
}

export default App;