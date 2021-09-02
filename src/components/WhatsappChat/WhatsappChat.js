import React from 'react';
import { Button } from 'react-bootstrap';
import WhatsappImg from '../../assets/img/WhatsApp.svg';

const WhatsappChat = () => {
    return (
        <Button
            href="https://wa.me/6285888840629?text=Assalamualaikum%2C+Saya+ingin+tahu+tentang+Asosiasi+Amanah+Muthowif+Indonesia"
            style={{
                position: 'absolute',
                bottom: 60,
                right: 20,
                border: 'none',
                borderRadius: 25,
                minWidth: 125,
                justifyContent: 'space-between',
                display: 'inline-flex',
                background: '#888888',
                fontSize: 15
            }}
            className="btn-fill btn"
            target="_blank"
        >
            <img src={WhatsappImg} alt="Live Chat WA" width={20} />
            Helpdesk
        </Button>
    );
};

export default WhatsappChat;