import "../../transactionItems.css";

export default function TransactionItemsComponent(props){

    const handleDeleteTransaction = (id) => {
        props.onDeleteTransaction(id);
    }

    const getDate = (theDate) =>{
        const dateObj = new Date(theDate);
        const arrBulan = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun","Jul", "Ags", "Sep", "Okt", "Nov", "Des"];
        return `${dateObj.getDate()} ${arrBulan[dateObj.getMonth()]} ${dateObj.getFullYear()}`;
    }

    return (
        <li className={` bg-white border-start border-5 border-${props.tipe === 'pemasukan' ? 'success' : 'danger'} rounded d-flex justify-content-between px-3 py-1 my-3`}>
            <div>
                <h6>{props.keterangan}</h6>
                <small>{getDate(props.tanggal)}</small>
            </div>
            <h3 className="fs-5">Rp. {props.nominal.toLocaleString('id-ID')}</h3>
            <span
                onClick={() => handleDeleteTransaction(props.id)}
                style={{
                    content: 'X',
                    cursor: 'pointer',  
                    position: 'absolute',
                    top: '50%',
                    left: '-25px',
                    transform: 'translateY(-50%)',
                    height: '20px',
                    width: '15px',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                }}
            />
        </li>
    );
}