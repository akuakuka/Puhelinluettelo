import React from 'react'


const Person = ({person, onDelete}) => {
  

  return (
    
    <li>
     {person.name} {person.number} <button
                    onClick={() => onDelete(person.id)}> poista
                </button>
            

    </li> 
  )
  
}
//{<button onClick={this.updateTesti(person)}></button>} // onClick={this.handleRemoveClick}
export default Person