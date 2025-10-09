interface ConfirmationModalProps {
    message: string;
    agreeAction: () => void;
    cancelAction: () => void;
}

export const ConfirmationModal = () => {
    return (
        <div className="modal">
            <form>
                <h3></h3>
                <button>Cancelar</button>
                <button>Aceptar</button>
            </form>
        </div>
    )
}