import * as React from 'react'
import { Row } from '../lib/row'
import { Select } from '../lib/select'
import { ILocationList } from './open-repository-in-vscode'

interface ISelectFromLocationListProps {
  /** The location list to open the repository in Visual Studio Code */
  readonly locationList: ILocationList[]
}

interface ISelectFromLocationListState {
  /** The path of selected location */
  readonly selectedLocationPath: string
}

export class SelectFromLocationList extends React.Component<
  ISelectFromLocationListProps,
  ISelectFromLocationListState
> {
  public constructor(props: ISelectFromLocationListProps) {
    super(props)

    const { locationList } = this.props
    const initialLocation = locationList.shift()

    if (initialLocation === undefined) {
      throw new Error('Could not find selected open target.')
    }

    this.state = {
      selectedLocationPath: initialLocation.path,
    }
  }

  private onLocationChange = (event: React.FormEvent<HTMLSelectElement>) => {
    const location = event.currentTarget.value

    this.setState({ selectedLocationPath: location })
  }

  public render() {
    const darwinLabel = 'Select Location To Open The Repository'
    const windowsLabel = 'Select location to open the repository'

    return (
      <Row>
        <Select
          label={__DARWIN__ ? darwinLabel : windowsLabel}
          value={this.state.selectedLocationPath}
          onChange={this.onLocationChange}
        >
          {this.props.locationList.map((file, index) => (
            <option key={index} value={file.path}>
              {file.locationName}
            </option>
          ))}
        </Select>
      </Row>
    )
  }
}
