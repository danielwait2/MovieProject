import { useState, useEffect } from 'react';

const BoldToggle = () => {
    const [isBold, setIsBold] = useState(false);

    // On component mount, read the cookie and set state
    useEffect(() => {
        const cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)bold\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        setIsBold(cookieValue === "true");
    }, []);

    // Update the cookie and the page style when the state changes
    useEffect(() => {
        document.cookie = `bold=${isBold};path=/`;
        if (isBold) {
            document.body.classList.add("bold-text");
        } else {
            document.body.classList.remove("bold-text");
        }
    }, [isBold]);

    return (
        <label  style={{ position: 'fixed', bottom: '10px', right: '10px', color: 'white' }}>
            Bold Text: 
            <input
                type="checkbox"
                checked={isBold}
                onChange={() => setIsBold(!isBold)}
            />
        </label>
    );
};

export default BoldToggle;