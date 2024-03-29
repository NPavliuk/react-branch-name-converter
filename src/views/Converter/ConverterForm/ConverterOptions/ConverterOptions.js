import styles from './ConverterOptions.module.scss'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RadioInput } from '@components/forms'
import { resetOptions, setPrefixOption } from '@store/reducers/optionsReducer/optionsActions'

export const ConverterOptions = () => {
  const radioRef = useRef()
  const dispatch = useDispatch()
  const prefixOptions = useSelector(state => state.options.defaultPrefixes)

  useEffect(() => {
    radioRef.current.checked = true
  }, [])

  const radioHandle = (e) => {
    const currentPrefix = e.target.value

    if(currentPrefix === 'none') {
      dispatch(resetOptions())
      return
    }

    dispatch(setPrefixOption(currentPrefix))
  }

  return (
    <div className={styles.options}>
      <h2 className={styles.optionsTitle}>Use prefixes:</h2>
      <div className={styles.optionsRow}>
        {prefixOptions.map(prefixOption => <RadioInput
          key={prefixOptions.indexOf(prefixOption)}
          id={`prefix-${prefixOption}`}
          value={prefixOption}
          groupName={'prefix'}
          content={`${prefixOption}/~`}
          handler={radioHandle}/>)}

        <RadioInput id={`prefix-none`} value={'none'} groupName={'prefix'} content={'none'} handler={radioHandle} refHandler={radioRef} />
      </div>
    </div>
  )
}
