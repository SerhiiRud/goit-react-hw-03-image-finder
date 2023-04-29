import { Component } from 'react';
import { getImages } from 'services/API';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';

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
  };

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchTerm !== this.props.searchTerm) {
      try {
        this.setState({ isLoading: true });
        this.setState({ status: Status.PENDING });
        const result = await getImages(this.props.searchTerm);
        this.setState({ images: result.data.hits, status: Status.RESOLVED });
      } catch (error) {
        console.log(error);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  // onModalShow = () => {
  //   this.setState({ modalShown: true });
  // };

  onModalShow = imageData => {
    this.setState({ imageData, modalShown: true });
  };

  render() {
    return (
      <>
        {this.state.isLoading && <Loader />}

        <ul>
          {[...this.state.images].map(image => (
            <ImageGalleryItem
              key={image.id}
              imageData={image}
              onImgClick={this.onModalShow}
            >
              <img src={image.previewURL} alt={image.tags} />
            </ImageGalleryItem>
          ))}
        </ul>
      </>
    );
  }
}

// componentDidUpdate(prevProps, prevState) {
//   const prevName = prevProps.pokemonName;
//   const nextName = this.props.pokemonName;

//   if (prevName !== nextName) {
//     this.setState({ status: Status.PENDING });

//     setTimeout(() => {
//       pokemonAPI
//         .fetchPokemon(nextName)
//         .then(pokemon => this.setState({ pokemon, status: Status.RESOLVED }))
//         .catch(error => this.setState({ error, status: Status.REJECTED }));
//     }, 3000);
//   }
// }

// onGetImages = () => {
//   const images = getImages(this.props.searchTerm);
//   this.setState({ images });
//   console.log(images);
