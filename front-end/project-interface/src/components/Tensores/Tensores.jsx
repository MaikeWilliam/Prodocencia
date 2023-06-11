import React, { useState } from 'react'
import "./Tensores.css"

export default function Tensores() {
    const [ricciChecked, setRicciChecked] = useState(false);
    const [riemannChecked, setRiemannChecked] = useState(false);
  
    const handleRicciChange = (event) => {
      setRicciChecked(event.target.checked);
    };
  
    const handleRiemannChange = (event) => {
      setRiemannChecked(event.target.checked);
    };
  
    return (
      <div className='Tensores'>
        <fieldset>
            <legend>Escolha o que deseja calcular</legend>
            <div className="Tensores-checkbox">
                <div>
                  <label>
                    <input type="checkbox" checked={ricciChecked} onChange={handleRicciChange} />
                    Tensor de Ricci
                  </label>
                </div>
                <div>
                  <label>
                    <input type="checkbox" checked={riemannChecked} onChange={handleRiemannChange} />
                    Tensor de Riemann
                  </label>
                </div>
            </div>
        </fieldset>
      </div>
    );
};
