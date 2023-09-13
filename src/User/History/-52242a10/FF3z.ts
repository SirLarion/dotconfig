import { IIcuFieldsFragment } from '../../types/commonFragments';

export interface IMarkerListQueryMarker {
  _id: string;
  tag: string;
  title: IIcuFieldsFragment;
  description: IIcuFieldsFragment;
}

export interface IMarkerListQueryResult {
  markers: IMarkerListQueryMarker[];
}
