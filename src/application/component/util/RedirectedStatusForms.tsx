import React, {useEffect}       from 'react'
import {DialogMessageComponent} from '../../../components/Dialog/DialogBasic'
import {useApplicationState}    from '../../hooks/useApplicationState'

interface IRedirectedStatusFormsProps {
  link : string,
  redirectLink : string,
  redirectLayout : string
  title : string,
  text : string,
  sub : string
}

const RedirectedStatusForm = ({title, link, sub, text, redirectLink, redirectLayout} : IRedirectedStatusFormsProps) => {

  const {setRedirectLink, redirectLink: redirectedLinkObject} = useApplicationState()
  useEffect(() => {
    const reg = new RegExp(`.*${link}$`)
    if (!redirectedLinkObject.link || !reg.exec(redirectedLinkObject.link)) {
      setRedirectLink(redirectLayout, redirectLink)
    }
  }, [redirectedLinkObject])

  return (
    <DialogMessageComponent
            title={title}
            text={text}
            sub={sub}
    />
  )
}
export default RedirectedStatusForm
