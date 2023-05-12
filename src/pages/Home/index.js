import React, { useContext } from "react";
import './index.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
// import { FiChevronUp, FiChevronDown } from 'react-icons/fi';
import Header from '../../componets/Header';

export default function Home({ AuthContext, Link }) {
    const { user } = useContext(AuthContext);


    return (
        <div id="Home">
            <Header AuthContext={AuthContext} Link={Link} />

            <div id="body">
                <div id="containGraphic" >
                    <div id="titleGraphic">
                        <h3>Análise Total</h3>
                    </div>
                    <div id="graphic">
                        <section className="progressbar">
                            <p id="textCicleKg">Kg</p>
                            <CircularProgressbar
                                value={user.kg / 100}
                                maxValue={1}
                                text={user.kg === 0 ? '0' : user.kg}
                                counterClockwise={false}
                                strokeWidth={19}
                                styles={buildStyles({
                                    rotation: 0.15,
                                    strokeLinecap: 'round',
                                    textSize: '16px',
                                    pathTransitionDuration: 0.5,
                                    pathColor: `rgba( 31, 164, 78, ${user.kg / 100})`,
                                    textColor: '#000',
                                    trailColor: '#d6d6d6',
                                    backgroundColor: '#32641B',
                                })}
                            />

                        </section>

                        <section className="progressbar">
                            <p id="textCiclePt">Pts</p>
                            <CircularProgressbar
                                value={user.pt / 100}
                                maxValue={1}
                                text={user.pt === 0 ? '0' : user.pt}
                                counterClockwise={false}
                                strokeWidth={19}
                                styles={buildStyles({
                                    rotation: 0.15,
                                    strokeLinecap: 'round',
                                    textSize: '16px',
                                    pathTransitionDuration: 0.5,
                                    pathColor: `rgba( 223, 68, 40, ${user.pt / 100})`,
                                    textColor: '#000',
                                    trailColor: '#d6d6d6',
                                    backgroundColor: '#DF4428',
                                })}
                            />

                        </section>
                    </div>
                </div>
            </div>

        </div>

    )
} 