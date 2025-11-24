import ProtectedAuth from '../../components/ProtectedAuth'
export default function AuthorizedAuth (){
    return(
        <>
        {/*Match Live Data Form*/}
              <section className="py-16 bg-gray-50">
        <div className="max-w-6xl px-4 mx-auto">
          <ProtectedAuth />
        </div>
      </section>
        </>
    )
}