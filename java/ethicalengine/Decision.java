package ethicalengine;

public enum Decision {
    
    PASSENGERS,
    PEDESTRIANS;
    
    @Override
    public String toString() {
        if (this == PASSENGERS) {
            return "passengers";
        } else {
            return "pedestrians";
        }
    }
    
}