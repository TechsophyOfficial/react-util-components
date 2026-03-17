import DOMPurify from 'dompurify'
import type { ReactElement } from 'react'

const RenderHtmlView = ({
  htmlContent,
}: {
  htmlContent: string
}): ReactElement => {
  const cleanText = DOMPurify.sanitize(htmlContent)
  return <div dangerouslySetInnerHTML={{ __html: cleanText }}></div>
}

export default RenderHtmlView
