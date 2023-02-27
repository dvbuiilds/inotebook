import {useState} from 'react';
import NoteContext from "./NoteContext";
 

const NoteState = (props)=>{
    // const state = {"name": "Dhairya", "class" : "8c"};
    const s1 = {"name": "Dhairya", "class" : "8c"};
    const [state, setState] = useState(s1);

    const update = ()=>{
        setTimeout(() => {
            setState({name: "Krishna", class:"11c"});
        }, 2500);
    }
    return (
        <NoteContext.Provider value={{state:state
        , update:update
        }}>
            {props.children}
        </NoteContext.Provider>
    )
};

export default NoteState;