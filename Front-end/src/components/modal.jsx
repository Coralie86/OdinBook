import style from "../styles/modal.module.css"

function Modal({handleCloseModal, text}) {

    return (
        <>
           
            <div className={style.backdrop} onClick={handleCloseModal}></div>
            <div className={style.dialog}>
                 <div className={style.textModal} >{text}</div>
                <button className={style.closeBtn} onClick={handleCloseModal}>
                Close
                </button>
            </div>
        </>
    )

}


export default Modal