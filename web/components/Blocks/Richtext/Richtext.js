export default function Richtext({ richtext }) {
    return (
        <div dangerouslySetInnerHTML={{ __html: richtext }} />
    )
}
