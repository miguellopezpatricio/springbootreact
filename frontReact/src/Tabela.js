function Tabela({vetor,selecionar}){
    return(
       <table className='table'>


               <thead>
               <tr>
                   <th>#</th>
                   <th>NOME</th>
                   <th>MARCA</th>
                   <th>SELECIONAR</th>
               </tr>
               </thead>

           <tbody>
           {
               vetor.map((obj, indice) => (
                   <tr key  = { indice }>
                       <td>{ indice + 1 }</td>
                       <td>{ obj.nome }</td>
                       <td>{ obj.marca }</td>
                       <td><button onClick={ ()=>{ selecionar(indice) } } className="btn btn-success">SELECIONAR</button></td>

                   </tr>
               ))
           }
           </tbody>

       </table>
    )
}

export default Tabela;