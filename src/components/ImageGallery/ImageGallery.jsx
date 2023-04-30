import { Component } from 'react';
import { getImages } from 'services/API';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';
import { Button } from 'components/Button/Button';
import { GalleryContainer } from './ImageGallery.styled';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export class ImageGallery extends Component {
  state = {
    images: [],
    status: 'idle',
    isLoading: false,
    modalShown: false,
    imageData: { img: '', tags: '' },
    page: 1,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.searchTerm !== this.props.searchTerm ||
      prevState.page !== this.state.page
    ) {
      try {
        this.setState({ isLoading: true });
        this.setState({ status: Status.PENDING });
        const result = await getImages(this.props.searchTerm, this.state.page);
        this.setState({
          images:
            prevProps.searchTerm === this.props.searchTerm
              ? [...prevState.images, ...result.data.hits]
              : [...result.data.hits],
          status: Status.RESOLVED,
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  onModalShow = imageData => {
    this.setState({ imageData, modalShown: true });
  };

  onModalClose = () => {
    this.setState({ modalShown: false });
  };

  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    return (
      <>
        {this.state.isLoading && <Loader />}

        <GalleryContainer>
          {[...this.state.images].map(image => (
            <ImageGalleryItem
              key={image.id}
              imageData={image}
              onImgClick={this.onModalShow}
            ></ImageGalleryItem>
          ))}
        </GalleryContainer>
        {this.state.images.length > 0 && this.state.status !== 'pending' && (
          <Button onClick={this.onLoadMore}>Load More</Button>
        )}
        {this.state.modalShown && (
          <Modal
            imageData={this.state.imageData}
            onModalClose={this.onModalClose}
          />
        )}
      </>
    );
  }
}
