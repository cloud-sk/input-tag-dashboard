import React, { useState } from 'react';
import './user.scss'

function UserInput(props) {
    const [tags, setTags] = useState([]);
    const [selectedTags, setSeletTag] = useState([]);
    const [filterData, setFilter] = useState(props.tags);
    const [toggle, setToggle] = useState(false);
    const [focus, setFocus] = useState(false)
    const [inputVal, setInput] = useState();
    const removeTags = indexToRemove => {
        setSeletTag([...selectedTags.filter((_, index) => index !== indexToRemove)]);
    };
    const handler = e => {
        let searchResult;
        let value = e.target.value;
        let array = filterData.length ? filterData : props.tags;
        if (value !== "") {
            setInput(value);
            searchResult = array.filter((e) => {
                return !value ? true : e.toUpperCase().search(value.toUpperCase()) !== -1
            });
            setTags(searchResult);
            setToggle(true);
        }
    }
    const addInput = (input) => {
        setInput('');
        setFilter([...filterData.filter((e) => e !== input)])
        setSeletTag([...selectedTags, input]);
        setTags([...tags.filter((e) => e !== input)]);
        setToggle(false)
    }
    function backSpaceHandler(e) {
        switch (e.keyCode) {
            case 8:
                if (focus) {
                    setSeletTag([...selectedTags.filter((e) => selectedTags.indexOf(e) !== selectedTags.length - 1)]);
                    setFilter([...filterData, selectedTags[selectedTags.length-1]])
                    setFocus(false)
                } else {
                    setFocus(true)
                }
                break;
            case 13:
                setSeletTag([...selectedTags, e.target.value]);
                setInput('');
                break;
        }

        return null
    }

    return (
        <div>
            <div className="user-input">
                <ul id="tags-container">
                    {selectedTags.length > 0 ? selectedTags.map((tag, index) => (
                        <li key={index} className={focus && index === selectedTags.length - 1 ? 'input focus' : 'input'}>
                            <span className='input-title'>{tag}</span>
                            <span className='input-close-icon'
                                onClick={() => removeTags(index)}
                            >
                                x
                    </span>
                        </li>
                    )) : null}
                </ul>

                <input
                    type="text"
                    onKeyUp={backSpaceHandler}
                    placeholder="Press enter to add tags"
                    onChange={(e) => handler(e)}
                    value={inputVal}
                />
            </div>
            {toggle && tags && tags.length ?
                <ul className="dd-list">
                    {tags.map((datas, index) => (
                        <li key={index} className="dd-list-item">
                            <span onClick={() => addInput(datas)}>
                                {datas}

                            </span>
                        </li>
                    ))}
                </ul> : null
            }

        </div>
    )
}

export default UserInput;