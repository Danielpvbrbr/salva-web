import React, { useContext } from "react";
import './index.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css'
// import { FiShoppingBag } from 'react-icons/fi';
import Header from '../../componets/Header';

export default function HomeAdm({ AuthContext, Link }) {
    const { usersSize, spots_, myRescues_, updateRescues } = useContext(AuthContext);

    return (
        <div id="HomeAdm">
            <Header rota='/' AuthContext={AuthContext} Link={Link} />

            <div id="body">
                <div id="containGraphic" >
                    <div id="graphic">
                        <section className="progressbar">
                            <p id="textCicleKg">Kg</p>
                            <CircularProgressbar
                                value={spots_.kg / 100}
                                maxValue={1}
                                text={spots_.kg}
                                counterClockwise={false}
                                strokeWidth={19}
                                styles={buildStyles({
                                    rotation: 0.15,
                                    strokeLinecap: 'round',
                                    textSize: '14px',
                                    pathTransitionDuration: 0.5,
                                    pathColor: `rgba( 31, 164, 78, ${spots_.kg / 100})`,
                                    textColor: '#000',
                                    trailColor: '#d6d6d6',
                                    backgroundColor: '#32641B',
                                })}
                            />

                        </section>

                        <section className="progressbar">
                            <p id="textCiclePt">Users</p>
                            <CircularProgressbar
                                value={usersSize / 100}
                                maxValue={1}
                                text={usersSize}
                                counterClockwise={false}
                                strokeWidth={19}
                                styles={buildStyles({
                                    rotation: 0.15,
                                    strokeLinecap: 'round',
                                    textSize: '14px',
                                    pathTransitionDuration: 0.5,
                                    pathColor: `rgba( 223, 68, 40, ${usersSize / 100})`,
                                    textColor: '#000',
                                    trailColor: '#d6d6d6',
                                    backgroundColor: '#DF4428',
                                })}
                            />

                        </section>
                    </div>
                </div>

                <div id="containRescues" >
                    <div id="titleRescues">
                        <h3>Pedidos</h3>
                    </div>
                    {myRescues_.length > 0 ?
                        myRescues_.map((v, i) =>
                            <>
                                {
                                    (!v.order_ && !v.delivered) &&
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
                                                delivered: v.delivered,
                                                order_: true
                                            })} style={{
                                                color: '#FFF',
                                                background: '#31B404',
                                                width: '70px',
                                                height: '35px',
                                                borderRadius: '5px',
                                                cursor: 'pointer',
                                                border: 'none'
                                            }}>Aprovar</button>
                                        </section>
                                    </div>
                                }
                            </>
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
        </div>
    )


} 