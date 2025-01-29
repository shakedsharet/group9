document.querySelector('.dropdown-btn').addEventListener('click', function() {
    let dropdownContent = document.querySelector('.dropdown-content');
    dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
});

document.addEventListener('DOMContentLoaded', function() {
    const roomSelect = document.getElementById('room-select');
    const priceSelect = document.getElementById('price-select');
    const neighborhoodSelect = document.getElementById('neighborhood-select');
    const additionalFilters = document.querySelectorAll('input[name="details"]');
    const apartmentCards = document.querySelectorAll('.ad-link');

    function filterApartments() {
        apartmentCards.forEach(card => {
            const adInfo = card.querySelector('.ad-information');
            const roomsMatch = checkRooms(adInfo);
            const priceMatch = checkPrice(adInfo);
            const neighborhoodMatch = checkNeighborhood(adInfo);
            const additionalFiltersMatch = checkAdditionalFilters(adInfo);
            card.classList.toggle('hidden', !(roomsMatch && priceMatch && neighborhoodMatch && additionalFiltersMatch));
           card.style.visibility = (roomsMatch && priceMatch && neighborhoodMatch && additionalFiltersMatch)
            ? 'visible'
            : 'hidden';
        });
    }

    function checkRooms(adInfo) {
        const selectedRooms = roomSelect.value;
        const cardRooms = parseFloat(adInfo.dataset.rooms);

        if (!selectedRooms) return true;

        if (selectedRooms === '+5') return cardRooms >= 5;
        return cardRooms === parseFloat(selectedRooms);
    }

    function checkPrice(adInfo) {
        const selectedPrice = priceSelect.value;
        const cardPrice = parseFloat(adInfo.dataset.price);

        if (!selectedPrice) return true;

        if (selectedPrice === '5000') return cardPrice >= 5000;

        const [minPrice, maxPrice] = selectedPrice.split('-').map(Number);
        return cardPrice >= minPrice && cardPrice <= maxPrice;
    }

    function checkNeighborhood(adInfo) {
        const selectedNeighborhood = neighborhoodSelect.value;
        const cardNeighborhood = adInfo.dataset.neighborhood;

        if (!selectedNeighborhood) return true;

        return cardNeighborhood === selectedNeighborhood;
    }

     function checkAdditionalFilters(adInfo) {
      const selectedFilters = Array.from(additionalFilters)
        .filter(filter => filter.checked)
        .map(filter => filter.value);

      if (selectedFilters.length === 0) return true;

      return selectedFilters.every(filter => {
        switch (filter) {
          case 'furnished':
            return adInfo.dataset.furnished === 'true';
          case 'pets':
            return adInfo.dataset.pets === 'true';
          case 'shelter':
            return adInfo.dataset.shelter === 'true';
          case 'garden':
            return adInfo.dataset.garden === 'true';
          case 'renovated':
            return adInfo.dataset.renovated === 'true';
          default:
            return true;
        }
      });
    }

    roomSelect.addEventListener('change', filterApartments);
    priceSelect.addEventListener('change', filterApartments);
    neighborhoodSelect.addEventListener('change', filterApartments);

    additionalFilters.forEach(filter => {
        filter.addEventListener('change', filterApartments);
    });

        document.querySelectorAll('.checkbox-details input[type="checkbox"]').forEach(input => {
      input.addEventListener('change', function() {
        const dataAttribute = 'data-' + this.id.replace('-ad', '');
        const adInformation = this.closest('.ad-information');
        adInformation.setAttribute(dataAttribute, this.checked ? 'true' : 'false');
      });
    });
});