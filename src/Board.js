import React from 'react'
import Note from './Note'
import FaPlus from 'react-icons/lib/fa/plus'

class Board extends React.Component{
    constructor(props)
    {
        super(props)
        this.state = {
            notes : []
        }
        this.displayeachNote =  this.displayeachNote.bind(this)
        this.update =  this.update.bind(this)
        this.remove =  this.remove.bind(this)
        this.addNote =  this.addNote.bind(this)
        this.nextId =  this.nextId.bind(this)
    }
    componentWillMount()
    {
        const self = this
        if(this.props.count){
            fetch(`https://baconipsum.com/api/?type=all-meat&sentences=${this.props.count}`)
                .then(response => response.json())
                .then(json =>json[0]
                    .split('. ')
                     .forEach(sent => self.addNote(sent.substring(0,25))))
        }
    }
    
    displayeachNote(note,id){
        return(
            <Note key={note.id} index={note.id} onChange={this.update} onRemove={this.remove}>
            {note.name}
            </Note>
        )
    }
    update(newText,id)
    {
        console.log('Updating ... ',id)
        this.setState(prevState =>({
            notes : prevState.notes.map(
                note => (note.id !== id) ? note : {...note, name:newText}
            )
        }))
    }
    remove(id)
    {
        console.log('Removing item at index  ... ',id)
        this.setState(prevState =>({
            notes : prevState.notes.filter(
                note => (note.id !== id) 
            )
        }))
    }
    addNote(text)
    {
        this.setState(prevState => ({
            notes: [
                ...prevState.notes,
                {
                    id:this.nextId(),
                    name:text
                }
            ]
        }))
    }
    nextId()
    {
        this.uniqueId = this.uniqueId || 0;
        return this.uniqueId++
    }
    render(){
        return(
            <div className="Board" >
                {this.state.notes.map(this.displayeachNote)}
                <button onClick={this.addNote.bind(null,"New Note")} id="add"><FaPlus /></button>
            
            </div>
        
        )
    }
}
export default Board
