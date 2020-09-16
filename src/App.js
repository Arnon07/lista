import React, {useState, useEffect, useMemo, useCallback} from 'react';
import './app.css';

function App() {

     const [tarefas, setTarefas] = useState([]);
     const [inpute, setInpute] = useState('');


     useEffect(()=>{
          const tarefasStorage = localStorage.getItem('tarefas');

          if(tarefasStorage){
               setTarefas(JSON.parse(tarefasStorage))
          }
     }, [])

     useEffect(() => {
          localStorage.setItem('tarefas', JSON.stringify(tarefas));
     }, [tarefas])

     const handleAdd = useCallback(() =>{
          if(inpute === ''){
               alert('Adicione alguma tarefa!');
               return false;
          }
          
          let data = {id: Date.now(), tarefa: inpute}
          setTarefas([...tarefas, data]);
          setInpute('');
     },[inpute, tarefas]);

     const totalTarefas = useMemo(()=> tarefas.length, [tarefas])

     const totalConcluido = useMemo(()=> {
          let concluidos = tarefas.filter(repo => repo.concluid);
          return concluidos.length
     },[tarefas])
     
     const total = useMemo(()=> {
          let totalTarefa = totalTarefas; 
          totalTarefa -= totalConcluido;
         return totalTarefa;
     }, [tarefas])


     function concluido (id){
          const newConcluido = tarefas.map(repo => {
               return repo.id === id ? {...repo, concluid: !repo.concluid} : repo
          })
          setTarefas(newConcluido);
     }

     function dell(){
          localStorage.clear();
          document.location.reload(true);


     }

  return (
    <div id="container">
         <h1>Lista de Tarefas</h1>
         <div className="conteiner-add">
               <input type="text" value={inpute} autoFocus onChange={(e) => setInpute(e.target.value)}/>
               <button type="button" onClick={handleAdd}>Adicionar</button>
         </div>
         <div className="info">
              {totalTarefas > 0 &&<strong>Tarefas: {totalTarefas}!</strong>}
               {totalConcluido > 0 &&<strong>Concluidos: {totalConcluido}!</strong>}
               {total > 0 &&<strong>Total não Concluida {total}</strong>}
               {totalConcluido == totalTarefas && totalTarefas > 0 &&<button type="button" onClick={dell}>Excluir todas as tarefas</button>}
         </div>
         <div id="list">
               <ul>
                    {tarefas.map(repo => (
                         <div key={repo.id}>
                              <li>
                                   {repo.tarefa}
                                   {repo.concluid && <span>Concluido</span>}
                              <button type="button" onClick={()=>concluido(repo.id)}>Marcar como Concluida</button>
                              </li>
                         </div>
                    ))}
               </ul>
         </div>
    </div>
  );
}

export default App;
