import TransactionItemsComponent from "./sub_components/TransactionItemsComponent";

export default function ListTransactionComponent(props) {
    const handleDeleteDataTransaction = (id) => {
        props.onDeleteTransaction(id);
    }
    return (
        <>
            <div className="col-12 col-lg-6">
                <h2 className="fw-light text-center">Pemasukan</h2>
                <hr className="w-75 mx-auto mb-2" />
                <ul className="overflow-y-scroll" style={{ "maxHeight": "400px" }}>
                    {
                        props.data.map((item) => {
                            return (Object.keys(item).length === 0) ?
                                <p key={1} className="text-center">Belum ada catatan pemasukan ...</p>
                                :
                                (item.nominal > 0) &&
                                <TransactionItemsComponent
                                    key={item.id}
                                    tipe="pemasukan"
                                    id={item.id}
                                    tanggal={item.tanggal}
                                    keterangan={item.keterangan}
                                    nominal={item.nominal}
                                    onDeleteTransaction={handleDeleteDataTransaction}
                                />
                        })
                    }

                </ul>
            </div>
            <div className="col-12 col-lg-6">
                <h2 className="fw-light text-center">Pengeluaran</h2>
                <hr className="w-75 mx-auto mb-2" />
                <ul className="overflow-y-scroll" style={{ "maxHeight": "400px" }}>
                    {
                        props.data.map((item) => {
                            return (Object.keys(item).length === 0) ?
                                <p key={1} className="text-center">Belum ada catatan pengeluaran ...</p>
                                :
                                (item.nominal <= 0) &&
                                <TransactionItemsComponent
                                    key={item.id}
                                    tipe="pengeluaran"
                                    id={item.id}
                                    tanggal={item.tanggal}
                                    keterangan={item.keterangan}
                                    nominal={item.nominal}
                                    onDeleteTransaction={handleDeleteDataTransaction}
                                />
                        })
                    }

                </ul>
            </div>
        </>
    )
}