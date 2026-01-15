import Stars from "./Stars"

const Comments = () => {
  return (
    <div className="mb-2 ml-2">
        <h5 className="font-bold">atuny0</h5>
        <p className="flex gap-2"> <span><Stars rating={5} /></span><span  className="-my-1">5</span></p>
        <p className="text-xs -mb-2">The product is nice. I got the delivery on time. I am using it for the last four months. My exprience with this product is very good.</p>
    </div>
  )
}

export default Comments