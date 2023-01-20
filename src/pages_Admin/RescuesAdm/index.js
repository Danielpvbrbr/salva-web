import React, { useContext } from "react";
import './index.css';
import 'react-circular-progressbar/dist/styles.css'
// import { FiShoppingBag } from 'react-icons/fi';

import Header from '../../componets/Header';

export default function RescuestAdm({ AuthContext, Link }) {
    const { myRescues_, updateRescues } = useContext(AuthContext);
    myRescues_.filter(person => console.log(person))
    return (
        <div id="RescuestAdm">
            <Header rota='/RescuesAdm' AuthContext={AuthContext} Link={Link} />

            <div id="body">
                <div id="containRescues" >
                    <div id="titleRescues">
                        <h3>Pedidos</h3>
                    </div>
                    {myRescues_.length > 0 ?
                        myRescues_.map((v, i) =>
                            (v.order_ > 0 && v.delivered < 1) &&
                            <div id="contRescues" key={i} >

                                <section id="areaImg" >
                                    <img
                                        src={v.image}
                                        alt={v.title}
                                        style={{
                                            width: '70px',
                                            height: '70px'
                                        }}
                                    />
                                </section>

                                <section id="areaInfo">
                                    <h3>{v.title}</h3>
                                    <h3 style={{
                                        color: '#000',
                                        fontSize: '11px',
                                        textAlign: 'center'
                                    }}>{v.name}</h3>
                                </section>

                                <section id="areaPrice">
                                    <button onClick={() => updateRescues({
                                        id: v.id,
                                        delivered: true,
                                        order_: v.order_
                                    })} style={{
                                        color: '#FFF',
                                        background: '#31B404',
                                        width: '80px',
                                        height: '35px',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                        border: 'none'
                                    }}>Entregue?</button>
                                </section>
                            </div>

                        )
                        :
                        <div style={{
                            width: '100%',
                            height: '25px',
                            textAlign: 'center',
                        }}>
                            {/* <FiShoppingBag id="iconCart" /> */}
                            <p>Nenhum produto!</p>
                        </div>
                    }

                </div>
            </div>
        </div >
    )


} 