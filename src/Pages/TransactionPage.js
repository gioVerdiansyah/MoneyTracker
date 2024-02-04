import ListTransactionComponent from "../components/ListTransactionComponent";
import AddTransactionComponent from "../components/addTransactionComponent";

export default function TransactionPage(props) {

    const handleAddTransaction = (data) => {
        props.onAddNewTransaction(data);
    }

    const handleDeleteTransaction = (id) => {
        const data = props.data.filter((item) => item.id !==  id);
        props.onDeleteDataTransaction(data);
    }

    return(
        <>
        <section id="transaction">
            <div className="container my-3">
                <div className="row">
                        <ListTransactionComponent transactionTipe="pemasukan" data={props.data} onDeleteTransaction={handleDeleteTransaction} />
                </div>
            </div>
        </section>
        <section id="transaction">
            <div className="container my-3">
                <div className="row">
                    <AddTransactionComponent onAddTransaction={handleAddTransaction}/>
                </div>
            </div>
        </section>
        </>
    )
}