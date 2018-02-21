import React from 'react'
import FaPencil from 'react-icons/lib/fa/pencil'
import FaTrash from 'react-icons/lib/fa/trash'
import FaFloppyO from 'react-icons/lib/fa/floppy-o'

class Note extends React.Component {
    constructor(props)
    {
        super(props)
        this.state = {
            editing :false
        }
        this.edit = this.edit.bind(this)
        this.remove = this.remove.bind(this)
        this.save = this.save.bind(this)
        this.renderEditing = this.renderEditing.bind(this)
        this.renderNotEditing = this.renderNotEditing.bind(this)
        this.randomCoodinates = this.randomCoodinates.bind(this)
    }
    componentWillMount()
    {
        this.style = {
            right : this.randomCoodinates(0, window.innerWidth - 150 , 'px'),
            top : this.randomCoodinates(0, window.innerHeight - 150 , 'px'),
            transform : `rotate(${this.randomCoodinates(-25,25,'deg')})`
        }
    }
    componentDidUpdate(){
        var textvar
        if(this.state.editing)
            {
                textvar = this.textdata
                textvar.focus()
                textvar.select()
            }
    }
    shouldComponentUpdate(nextProps, nextState)
    {
        return(
            this.props.children !== nextProps.children || this.state!== nextState
        )
    }
    
    randomCoodinates(x,y,s)
    {
        return x+Math.ceil(Math.random() * (y-x)) + s
    }
    edit()
    {
        this.setState({
            editing:true
        })
    }
    remove()
    {
        this.props.onRemove (this.props.index)
        //alert('Delete button')
    }
    renderEditing()
    {
        return (
            <div style={this.style}>
                <form onSubmit ={this.save} >
                    <textarea ref={input =>this.textdata = input} defaultValue={this.props.children} />
                    <button><FaFloppyO /></button>
                </form>
            </div>
        )
    }
    save(e)
    {
        e.preventDefault()
        this.props.onChange(this.textdata.value, this.props.index)
        this.setState({
            editing:false
        })
        //alert(this.textdata.value)
        //this.renderNotEditing()
    }
    renderNotEditing(){
        return(
            <div className="note" style={this.style}>
                <p>{this.props.children} </p>
                <span>
                    <button onClick={this.edit}><FaPencil /></button>
                    <button onClick={this.remove}><FaTrash /></button>
                </span>
            </div>
        )
    }
    render(){
        return this.state.editing ? this.renderEditing():this.renderNotEditing()
        
    }
}
export default Note