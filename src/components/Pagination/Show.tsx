import React            from 'react'
import ShowComponent    from '../basic/ShowComponent'
import PaginationButton from './PaginationButton'

export default () => {
  return (
    <div style={{width: '100%'}}>

      <ShowComponent>
        <div>
          <PaginationButton text={'<'} disabled value={1}/>
          <PaginationButton text={'1'} active value={1}/>
          <PaginationButton text={'2'} value={2}/>
          <PaginationButton text={'3'} value={3}/>
          <PaginationButton text={'4'} value={4}/>
          <PaginationButton text={'>'} value={5}/>
        </div>
        <div>
                    Default pagination
        </div>
      </ShowComponent>

      <ShowComponent>
        <div>
          <PaginationButton text={'<'} disabled color={'primary'} value={1}/>
          <PaginationButton text={'1'} active color={'primary'} value={1}/>
          <PaginationButton text={'2'} color={'primary'} value={2}/>
          <PaginationButton text={'3'} color={'primary'} value={3}/>
          <PaginationButton text={'4'} color={'primary'} value={4}/>
          <PaginationButton text={'>'} color={'primary'} value={5}/>
        </div>
        <div>
                    Primary pagination
        </div>
      </ShowComponent>

      <ShowComponent>
        <div>
          <PaginationButton text={'<'} disabled color={'secondary'} value={1}/>
          <PaginationButton text={'1'} active color={'secondary'} value={1}/>
          <PaginationButton text={'2'} color={'secondary'} value={2}/>
          <PaginationButton text={'3'} color={'secondary'} value={3}/>
          <PaginationButton text={'4'} color={'secondary'} value={4}/>
          <PaginationButton text={'>'} color={'secondary'} value={5}/>
        </div>
        <div>
                    Secondary pagination
        </div>
      </ShowComponent>

      <ShowComponent>
        <div>
          <PaginationButton text={'<'} disabled color={'success'} value={1}/>
          <PaginationButton text={'1'} active color={'success'} value={1}/>
          <PaginationButton text={'2'} color={'success'} value={2}/>
          <PaginationButton text={'3'} color={'success'} value={3}/>
          <PaginationButton text={'4'} color={'success'} value={4}/>
          <PaginationButton text={'>'} color={'success'} value={5}/>
        </div>
        <div>
                    Success pagination
        </div>
      </ShowComponent>

      <ShowComponent>
        <div>
          <PaginationButton text={'<'} disabled color={'danger'} value={1}/>
          <PaginationButton text={'1'} active color={'danger'} value={1}/>
          <PaginationButton text={'2'} color={'danger'} value={2}/>
          <PaginationButton text={'3'} color={'danger'} value={3}/>
          <PaginationButton text={'4'} color={'danger'} value={4}/>
          <PaginationButton text={'>'} color={'danger'} value={5}/>
        </div>
        <div>
                    Danger pagination
        </div>
      </ShowComponent>

      <ShowComponent>
        <div>
          <PaginationButton text={'<'} disabled color={'info'} value={1}/>
          <PaginationButton text={'1'} active color={'info'} value={1}/>
          <PaginationButton text={'2'} color={'info'} value={2}/>
          <PaginationButton text={'3'} color={'info'} value={3}/>
          <PaginationButton text={'4'} color={'info'} value={4}/>
          <PaginationButton text={'>'} color={'info'} value={5}/>
        </div>
        <div>
                    Info pagination
        </div>
      </ShowComponent>

    </div>
  )
}
