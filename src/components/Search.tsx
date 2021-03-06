// * react
import React, {useState, useRef, useCallback} from 'react'
import debounce from 'lodash.debounce'

// * redux 
import {useDispatch, useSelector} from 'react-redux'
import {setSearchValue} from '../redux/filter/filterSlice'
import {selectFilter} from '../redux/filter/selectors'

const Search: React.FC = () => {
    const dispatch = useDispatch()
    const {searchValue} = useSelector(selectFilter)

    const [value, setValue] = useState<string>('')

    const inputRef = useRef<HTMLInputElement>(null)

    const updateSearchValue = useCallback(
        debounce((str: string): void => {
            dispatch(setSearchValue(str))
        }, 300)
        ,[]
    )

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const {value} = e.target
        setValue(value)
        updateSearchValue(value)
    }

    const onClickClear = (): void => {
        dispatch(setSearchValue(''))
        setValue('');
        inputRef.current?.focus()
    }

    return (
        <div className='search'>
            <svg
                className='icon'
                enableBackground="new 0 0 32 32"
                id="EditableLine"
                version="1.1"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg">
                <circle
                    cx="14"
                    cy="14"
                    fill="none"
                    id="XMLID_42_"
                    r="9"
                    stroke="#84cc16"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    strokeWidth="2"
                />
                <line
                    fill="none"
                    id="XMLID_44_"
                    stroke="#84cc16"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    strokeWidth="2"
                    x1="27"
                    x2="20.366"
                    y1="27"
                    y2="20.366"
                />
            </svg>
            <input 
                className='input'
                ref={inputRef}
                value={value}
                placeholder='?????????? ??????????'
                onChange={(e) => onChangeInput(e)}
            />
             {
                searchValue
                && (
                    <svg
                        onClick={() => onClickClear()}
                        className='clearIcon'
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
                    </svg>
                )
            }
        </div>
    )
}

export default Search