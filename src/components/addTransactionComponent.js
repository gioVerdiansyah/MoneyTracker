import { format, parse, getTime } from "date-fns";
import React from "react";

export default function AddTransactionComponent(props) {

    const [errorInput, setErrorInput] = React.useState({
        tanggal: '',
        keterangan: '',
        nominal: ''
    });

    const formValid = React.useRef(true);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const validatedInput = handleValidation(e.target);

        if (formValid.current) {
            props.onAddTransaction(validatedInput);
            e.target.reset();
        }
    }

    const handleValidation = (input) => {
        let errorMessage = {};
        if (input.elements['tanggal'].value.trim() === "") {
            errorMessage.tanggal = "Tanggal tidak boleh kosong!";
        } else if (!/^\d{4}-\d{2}-\d{2}$/.test(input.elements['tanggal'].value)) {
            errorMessage.tanggal = "Tanggal tidak valid!"
        } else {
            errorMessage.tanggal = "";
        }

        if (input.elements['keterangan'].value.trim() === "") {
            errorMessage.keterangan = "Keterangan tidak boleh kosong!";
        } else if (input.elements['keterangan'].value.length >= 50) {
            errorMessage.keterangan = "Keterangan tidak boleh lebih dari 50!";
        } else {
            errorMessage.keterangan = "";
        }

        if (input.elements['nominal'].value.trim() === "") {
            errorMessage.nominal = "Nominal tidak boleh kosong!";
        } else if (!/^[+|-]?\d+$/.test(input.elements['nominal'].value)) {
            errorMessage.nominal = "Keterangan tidak boleh lebih dari 50!";
        } else {
            errorMessage.nominal = "";
        }

        setErrorInput(errorMessage);

        formValid.current = true;
        for (const key in errorMessage) {
            if (errorMessage[key].length > 0) {
                formValid.current = false;
            }
        }

        return {
            id: Math.random().toString().replace('.', ''),
            tanggal: getTime(parse(input.elements['tanggal'].value, 'yyyy-MM-dd', new Date())),
            keterangan: input.elements['keterangan'].value,
            nominal: parseInt(input.elements['nominal'].value)
        }
    }

    return (
        <>
            <form onSubmit={handleFormSubmit}>
                <div className="row">
                    <div className="col-12 col-md-3 col-lg-2 mb-3">
                        <label htmlFor="tanggal" className="form-label">Tanggal</label>
                        <input type="date" id="tanggal" name="tanggal"
                            placeholder="dd/mm/yyy"
                            className={`form-control ${errorInput.tanggal && 'is-invalid'}`} defaultValue={format(new Date(), 'yyyy-MM-dd')} />
                        {errorInput.tanggal &&
                            <div className="invalid-feedback">
                                <p>{errorInput.tanggal}</p>
                            </div>
                        }
                    </div>
                    <div className="col-12 col-md-6 col-lg-5 mb-3">
                        <label htmlFor="Keterangan" className="form-label">
                            Keterangan</label>
                        <input type="text" id="keterangan" name="keterangan"
                            placeholder="Bayar Cicilan"
                            className={`form-control ${errorInput.keterangan && 'is-invalid'}`} />
                        {errorInput.keterangan &&
                            <div className="invalid-feedback">
                                <p>{errorInput.keterangan}</p>
                            </div>
                        }
                    </div>
                    <div className="col-12 col-md-3 col-lg-3 mb-3">
                        <label htmlFor="nominal" className="form-label">
                            Nominal* (+/-)</label>
                        <input type="text" id="nominal" name="nominal"
                            placeholder="-150000"
                            className={`form-control ${errorInput.nominal && 'is-invalid'}`} />
                        {errorInput.nominal &&
                            <div className="invalid-feedback">
                                <p>{errorInput.nominal}</p>
                            </div>
                        }
                    </div>
                    <div className="col-12 col-lg-2 mb-3 d-flex align-items-end">
                        <button type="submit" className="btn btn-primary flex-fill">
                            Tambah</button>
                    </div>
                </div>
                <p><small>* Jika diisi angka negatif,
                    akan tercatat di pengeluaran</small></p>
            </form>
        </>
    );
}
