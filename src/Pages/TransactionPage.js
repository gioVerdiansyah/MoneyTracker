import ListTransactionComponent from "../components/ListTransactionComponent";
import AddTransactionComponent from "../components/addTransactionComponent";

export default function TransactionPage(props) {

    const handleAddTransaction = (data) => {
        props.onAddNewTransaction(data);
    }

    const handleDeleteTransaction = (id) => {
        const data = props.data.filter((item) => item.id !== id);
        props.onDeleteDataTransaction(data);
    }

    const getSaldo = () => {
        let saldo = 0;
        props.data.forEach((item) => {
            saldo += item.nominal;
        });

        return saldo;
    }

    const getSaldoPositive = () => {
        let saldoP = 0;

        props.data.forEach((item) => {
            if(item.nominal > 0){
                saldoP += item.nominal;
            }
        });

        return saldoP;
    }

    const getSaldoNegative = () => {
        let saldoN = 0;

        props.data.forEach((item) => {
            if(item.nominal <= 0){
                saldoN += item.nominal;
            }
        });

        return saldoN;
    }

    return (
        <>
            <div className="card">
                <div className="card-body mx-5">
                    <small className="text-black-50">Saldo</small>
                    <h1 className="text-muted fw-light">Rp. {getSaldo().toLocaleString('id-ID')}</h1>
                </div>
                <div className="card-footer text-muted d-flex justify-content-between p-0">
                    <div className="bg-success col-6 boder border-1 border-end border-white py-2 border-left">
                        <p className="text-center m-0 text-white">Rp. {getSaldoPositive().toLocaleString('id-ID')}</p>
                    </div>
                    <div className="bg-danger col-6 boder border-1 border-start border-white py-2 border-right">
                        <p className="text-center m-0 text-white">Rp. {getSaldoNegative().toLocaleString('id-ID')}</p>
                    </div>
                </div>
            </div>
            <section id="list-transaction">
                <div className="container my-3">
                    <div className="row">
                        <ListTransactionComponent transactionTipe="pemasukan" data={props.data} onDeleteTransaction={handleDeleteTransaction} />
                    </div>
                </div>
            </section>
            <section id="transaction">
                <div className="container my-3">
                    <div className="row">
                        <AddTransactionComponent onAddTransaction={handleAddTransaction} />
                    </div>
                </div>
            </section>
        </>
    )
}