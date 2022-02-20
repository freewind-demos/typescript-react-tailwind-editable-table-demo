import React, {useEffect} from 'react';
import {FC} from 'react';
import {KeyboardEvent} from 'react';
import {useRef} from 'react';
import {useState} from 'react';
import {STYLE_CONSTS} from './STYLE_CONSTS';


type Props = {
  value: number
  updateValue: (value: number) => void
}

function isValidNumber(text: string): boolean {
  return !Number.isNaN(Number(text))
}

export const NumberInputCell: FC<Props> = React.memo(({value, updateValue}) => {
    console.log("### > NumberInputCell", value)
    const cellRef = useRef<HTMLInputElement | null>(null)

    const [text, setText] = useState(value.toString())

    useEffect(() => {
      setText(value.toString())
    }, [value])

    function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
      console.log("event.key", event.key);
      if (event.key === 'Enter' || event.key === 'Escape') {
        event.preventDefault();
        cellRef.current?.blur();
        if (isValidNumber(text)) {
          updateValue(Number(text));
        }
      }
    }

    return <input tabIndex={1}
                  className={`h-8 bg-transparent focus:bg-white px-2 px-1 ${isValidNumber(text) ? '' : 'invalidNumber'}`}
                  ref={cellRef} onKeyDown={handleKeyDown}
                  onBlur={(event) => {
                    console.log('### blur')
                    if (isValidNumber(text)) {
                      updateValue(Number(text));
                    }
                  }}
                  onChange={(e) => setText(e.target.value)} value={text}/>

  }
)
