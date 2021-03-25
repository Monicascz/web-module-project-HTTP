import Axios from 'axios'
import React, {useState, useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'

const initFormVals={
    title:"",
    director: "",
    genre: "",
    metascore: 0,
    description: ""
}

export default function AddMovieForm(props) {
    const [formValues, setFormValues] = useState(initFormVals) 
    const history = useHistory();
    
    const handleChange = (e) => {
    setFormValues({...formValues, [e.target.name]:e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formValues)
        const newMovie = {
            id: new Date(),
        title:formValues.title,
        director: formValues.director,
        genre: formValues.genre,
        metascore: formValues.metascore,
        description: formValues.description
        }
        Axios.post('http://localhost:5000/api/movies', newMovie)
        .then((resp)=>{
            props.getMovies();
            history.push('/movies')
        })
        .catch((err)=>{
            console.log("error", err.response)
        })
    }



    return (
        <div className="col">
		<div className="modal-content">
			<form>
				<div className="modal-header">						
					<h4 className="modal-title">Add A New Movie <strong>
                        </strong></h4>
				</div>
				<div className="modal-body">					
					<div className="form-group">
						<label>Title</label>
						<input value={formValues.title} onChange={handleChange} name="title" type="text" className="form-control"/>
					</div>
					<div className="form-group">
						<label>Director</label>
						<input value={formValues.director} onChange={handleChange} name="director" type="text" className="form-control"/>
					</div>
					<div className="form-group">
						<label>Genre</label>
						<input value={formValues.genre} onChange={handleChange} name="genre" type="text" className="form-control"/>
					</div>
					<div className="form-group">
						<label>Metascore</label>
						<input value={formValues.metascore} onChange={handleChange} name="metascore" type="number" className="form-control"/>
					</div>		
					<div className="form-group">
						<label>Description</label>
						<textarea value={formValues.description} onChange={handleChange} name="description" className="form-control"></textarea>
					</div>
									
				</div>
				<div className="modal-footer">			    
					<input onClick={handleSubmit}type="submit" className="btn btn-info" value="Add"/>
					<Link to={`/movies`}><input type="button" className="btn btn-default" value="Cancel"/></Link>
				</div>
			</form>
		</div>
    </div>
    );
}
