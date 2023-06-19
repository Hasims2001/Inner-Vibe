export function edit_btn({ handlEdit, id = 0, val }) {
    return (
        <button onClick={() => handlEdit(id)}>
            <div className="svg-wrapper-1">
                <div className="svg-wrapper">
                    <svg
                        height="24"
                        width="24"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M0 0h24v24H0z" fill="none"></path>
                        <path
                            d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                            fill="currentColor"
                        ></path>
                    </svg>
                </div>
            </div>
            <span>{val}</span>
        </button>
    );
}
export function edit_btn_type({ type }) {
    return (
        <button type={type}>
            <div className="svg-wrapper-1">
                <div className="svg-wrapper">
                    <svg
                        height="24"
                        width="24"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M0 0h24v24H0z" fill="none"></path>
                        <path
                            d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                            fill="currentColor"
                        ></path>
                    </svg>
                </div>
            </div>
            <span>Submit</span>
        </button>
    );
}


export function delete_btn({ handleDelete, id = 0, val2 }) {
    return (
        <button className="noselect" onClick={() => handleDelete(id)}>
            <span className="text">{val2}</span>
            <span className="icon">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                >
                    <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path>
                </svg>
            </span>
        </button>
    );
}